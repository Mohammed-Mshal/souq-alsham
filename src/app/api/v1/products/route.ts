import ClearEmptyFiles from '@/libs/ClearEmptyFiles'
import imageKit from '@/libs/imageKit'
import RouteWrapper from '@/libs/RouteWrapper'
import { verifySession } from '@/libs/session'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
const prisma = new PrismaClient()
export async function GET(request: NextRequest) {
    return RouteWrapper(async () => {
        await prisma.$connect()
        const page = request.nextUrl.searchParams.get('page') || '1'
        const limit = request.nextUrl.searchParams.get('limit') || '20'

        const session = await verifySession()
        if (session && session.userId) {
            const user = await prisma.user.findFirst({
                where: {
                    id: session?.userId as string || ''
                }
            })
            if (user) {
                const products = await prisma.product.findMany({
                    skip: (parseInt(page) - 1) * parseInt(limit),
                    take: parseInt(limit),
                    include: {
                        owner: {
                            select: {
                                id: true,
                                image: true,
                                name: true,
                                phone: true,
                            }
                        }
                    }
                })
                return NextResponse.json({
                    success: true,
                    message: "Products retrieved successfully",
                    data: {
                        products,
                        pagination: {
                            page: parseInt(page),
                            limit: parseInt(limit),
                            total: await prisma.product.count()
                        }
                    }
                }, {
                    status: 200
                });
            }
        }
        const products = await prisma.product.findMany({
            skip: (parseInt(page) - 1) * parseInt(limit),
            take: parseInt(limit),
            select: {
                title: true,
                description: true,
                images: true,
                thumbnail: true,
                brand: true,
                // category: true,
                quantity: true,
                owner: {
                    select: {
                        id: true,
                        image: true,
                        name: true,

                    }
                },
            },

        })
        return NextResponse.json({
            success: true,
            message: "Products retrieved successfully",
            data: {
                products,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: await prisma.product.count()
                }
            }
        }, {
            status: 200
        })
    })
}

export async function POST(request: NextRequest) {
    return RouteWrapper(async () => {
        await prisma.$connect()
        const session = await verifySession()
        if (!session || !session.userId) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized access",
            }, {
                status: 401
            })
        }

        const user = await prisma.user.findFirst({
            where: {
                id: session.userId
            }
        })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, {
                status: 404
            })
        }
        let formData;
        try {
            formData = await request.formData();
        } catch (error) {
            console.log(error);
            return NextResponse.json({
                success: false,
                message: "Failed to parse form data",
                error: "Invalid or malformed form data submitted"
            }, {
                status: 400
            });
        }
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const categoryId = formData.get('categoryId') as string;
        const thumbnail = formData.get('thumbnail') as File;
        const price = (formData.get('price') as string) as unknown as number;
        const quantity = (formData.get('quantity') as string) as unknown as number;
        const rating = (formData.get('rating') as string) as unknown as number;
        const brand = formData.get('brand') as string;
        const imagesForm = ClearEmptyFiles(formData.getAll(`image`) as File[]);
        if (!title || !description || !categoryId || !price || imagesForm.length === 0 || !thumbnail || thumbnail.size === 0 || !brand) {
            return NextResponse.json({
                success: false,
                message: "Missing required fields",
                error: {
                    code: 'MISSING_FIELDS',
                    message: 'Title, description, category, price, brand, thumbnail, and at least one image are required'
                }
            }, {
                status: 400
            }
            )
        }
        if (imagesForm.length < 1 || imagesForm.length > 5) {
            return NextResponse.json({
                success: false,
                message: "Image validation failed",
                error: {
                    code: 'INVALID_IMAGE_COUNT',
                    message: 'Image count must be between 1 and 5',
                    min: 1,
                    max: 5,
                    count: imagesForm.length
                }
            }, {
                status: 400
            });
        }

        const oversizedImages = imagesForm.filter(img => img.size > 1024 * 1024 * 2);
        if (oversizedImages.length > 0) {
            const oversizedFileNames = oversizedImages.map(img => img.name).join(', ');
            return NextResponse.json({
                success: false,
                message: "Image size validation failed",
                error: {
                    code: 'IMAGE_SIZE_EXCEEDED',
                    message: `The following images exceed the 2MB size limit: ${oversizedFileNames}`,
                    limit: '2MB',
                    oversizedFiles: oversizedImages.map(img => ({
                        name: img.name,
                        size: `${(img.size / (1024 * 1024)).toFixed(2)}MB`
                    }))
                }
            }, {
                status: 400
            });
        }
        // Upload thumbnail to ImageKit
        const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer());
        const thumbnailUpload = await imageKit.upload({
            file: thumbnailBuffer,
            fileName: `thumbnail-${Date.now()}-${thumbnail.name}`,
            folder: '/products/thumbnails',
        });

        // Upload product images to ImageKit
        const imageUploads = await Promise.all(imagesForm.map(async (image) => {
            const buffer = Buffer.from(await image.arrayBuffer());
            return imageKit.upload({
                file: buffer,
                fileName: `product-${Date.now()}-${image.name}`,
                folder: '/products/images'
            });
        }));

        // Create product with uploaded images
        const newProduct = await prisma.product.create({
            data: {
                title,
                brand,
                price: Number(price),
                quantity: Number(quantity),
                rating: Number(rating),
                description,
                ownerId: user.id,
                categoryId: categoryId,
                thumbnail: {
                    url: thumbnailUpload.url,
                    id: thumbnailUpload.fileId,
                    altText: ''
                },
                images: imageUploads.map(upload => ({
                    url: upload.url,
                    id: upload.fileId,
                    altText: ''
                }))
            }
        });
        return NextResponse.json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        }, {
            status: 201
        })
    })
}


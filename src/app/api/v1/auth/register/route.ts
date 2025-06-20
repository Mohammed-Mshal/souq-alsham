import imageKit from "@/libs/imageKit";
import { createSession } from "@/libs/session";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from 'bcryptjs'
const prisma = new PrismaClient()
export async function POST(request: NextRequest) {
    try {
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
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const phone = formData.get('phone') as string
        const phoneCode = formData.get('code') as string
        const birthday = formData.get('birthday') ? new Date(formData.get('birthday') as string) : null
        const image = formData.get('image') as File
        const password = formData.get('password') as string
        const gender = formData.get('gender') as string
        if (!name || !email || !phone || !password || !birthday) {
            const missingFields = [];
            if (!name) missingFields.push('name');
            if (!email) missingFields.push('email');
            if (!phone) missingFields.push('phone');
            if (!birthday) missingFields.push('birthday');
            if (!password) missingFields.push('password');
            if (!gender) missingFields.push('gender');
            if (!phoneCode) missingFields.push('code');
            return NextResponse.json({
                success: false,
                message: "Missing required fields",
                error: `Please provide the following required fields: ${missingFields.join(', ')}`,
                missingFields
            }, {
                status: 400
            });
        }
        if (phone.length < 8 || phone.length > 9) {
            return NextResponse.json({
                success: false,
                message: "Invalid phone number",
                error: "Phone number must be between 8 and 9 digits"
            }, {
                status: 400
            });
        }
        if (phoneCode.length < 2 || phoneCode.length > 4) {
            return NextResponse.json({
                success: false,
                message: "Invalid phone code",
                error: "Phone code must be between 2 and 4 digits"
            }, {
                status: 400
            });
        }
        const isUserExist = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email
                    }
                    ,
                    {
                        phone
                    }
                ]
            }
        });
        if (isUserExist) {
            return NextResponse.json({
                success: false,
                message: "Email or phone number already used",
                error: "A user with this email or phone number already used"
            }, {
                status: 409
            });
        }
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
            return NextResponse.json({
                success: false,
                message: "Invalid password format",
                error: "Password must meet all security requirements",
                details: {
                    minLength: 8,
                    currentLength: password.length,
                    requirements: [
                        "Minimum 8 characters",
                        "At least one uppercase letter",
                        "At least one lowercase letter",
                        "At least one number",
                        "At least one special character (!@#$%^&*)"
                    ],
                    missingRequirements: [
                        ...(password.length < 8 ? ["Minimum 8 characters"] : []),
                        ...(/[A-Z]/.test(password) ? [] : ["Uppercase letter"]),
                        ...(/[a-z]/.test(password) ? [] : ["Lowercase letter"]),
                        ...(/[0-9]/.test(password) ? [] : ["Number"]),
                        ...(/[!@#$%^&*]/.test(password) ? [] : ["Special character"])
                    ]
                }
            }, {
                status: 400
            });
        }
        // Validate birthday format and age restrictions
        const today = new Date();
        const birthdayDate = new Date(birthday);
        const age = today.getFullYear() - birthdayDate.getFullYear();
        const monthDiff = today.getMonth() - birthdayDate.getMonth();

        if (isNaN(birthdayDate.getTime())) {
            return NextResponse.json({
                success: false,
                message: "Invalid birthday format",
                error: "Please provide a valid date format (YYYY-MM-DD)"
            }, {
                status: 400
            });
        }

        if (birthdayDate > today) {
            return NextResponse.json({
                success: false,
                message: "Invalid birthday",
                error: "Birthday cannot be in the future"
            }, {
                status: 400
            });
        }

        // Check if user is at least 13 years old
        if (age < 13 || (age === 13 && monthDiff < 0) || (age === 13 && monthDiff === 0 && today.getDate() < birthdayDate.getDate())) {
            return NextResponse.json({
                success: false,
                message: "Age restriction",
                error: "Users must be at least 13 years old to register"
            }, {
                status: 400
            });
        }
        const salt = await genSalt(10)
        const hashedPassword = await hash(password.trim(), salt)
        let userImage = null;
        if (image && image.size > 0) {
            try {
                const bufferImage = Buffer.from(await image.arrayBuffer());
                const fileName = `user_${Date.now()}_${image.name}`;

                const uploadResponse = await imageKit.upload({
                    file: bufferImage,
                    fileName: fileName,
                    folder: '/users',
                    tags: ['user', 'profile'],
                    useUniqueFileName: true
                });

                userImage = {
                    id: uploadResponse.fileId,
                    url: uploadResponse.url,
                    altText: ''
                };
            } catch (uploadError) {
                console.error('Error uploading image:', uploadError);
                throw new Error('Failed to upload profile image');
            }
        }
        // Create new user with validated data
        const newUser = await prisma.user.create({
            data: {
                email: email.toLowerCase().trim(),
                name: name.trim(),
                phone: phone.trim(),
                password: hashedPassword,
                gender,
                phoneCode,
                birthday,
                image: {
                    id: userImage?.id,
                    url: userImage?.url,
                    altText: userImage?.altText
                },
            },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                phoneCode: true,
                image: true,
                isVerified:true,
                createdAt: true,
            }
        });

        // Create user session
        const session = await createSession(newUser.id);

        // Return success response with user data
        return NextResponse.json({
            success: true,
            message: "Registration successful! Welcome to our platform.",
            data: {
                user: {
                    ...newUser,
                    session: session
                }
            }
        }, {
            status: 201 // Created status code
        });
    } catch (error) {
        console.error('Error in registration process:', error);

        return NextResponse.json({
            success: false,
            message: "Registration failed",
            error: "An unknown error occurred during registration"
        }, {
            status: 500
        });
    }
    finally {
        await prisma.$disconnect()
    }
}
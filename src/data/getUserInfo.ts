import { verifySession } from "@/libs/session"
import { PrismaClient } from "@prisma/client"

const prisma=new PrismaClient()
export const getUserInfo=async ()=>{
    try {
      const session=await verifySession()
      if(!session?.userId){
        return null
      }
      const user=await prisma.user.findUnique({
        where:{
            id:session.userId as string
        },
      })
      return user
    } catch (error) {
        console.error('Error getting user info:', error)
        return null
    }
}
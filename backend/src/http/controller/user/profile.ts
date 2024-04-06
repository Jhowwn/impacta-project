import { makeGetUserProfileUseService } from "@/utils/factories/make-get-user-profile-use-case"
import { Request, Response } from "express"

export async function profile(req: Request, res: Response) {
  const getUserProfile = makeGetUserProfileUseService()

  const {userId} = req.body

  const { user } = await getUserProfile.execute({
    userId,
  })

  if (!user) {
    return res
      .status(400)
      .json({ error: true, message: 'User not found.' });
  }

  return res.status(200).json({
    email: user.email,
    role: user.role,
    name: user.name
  })
}

import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        res.status(403).json({ error: "Not signed in" })
    } else {
        res.status(200).json({ error: "You are signed in" })
    }
}
import { redirect } from 'next/navigation'
import { db } from "@/lib/db"
import { initialProfile } from "@/lib/initial-profile"
import { InitialModal } from '@/components/modals/initial-modal'

const SetupPage = async () => {

    // 初始化用户
    const profile = await initialProfile()

    // 获取member是当前用户的第一Server
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (server) {
        return redirect(`/servers/${server.id}`)
    }

    return (
        <InitialModal />
    )
}

export default SetupPage
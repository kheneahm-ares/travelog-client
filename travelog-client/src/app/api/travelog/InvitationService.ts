import { IInvitation } from "../../common/interfaces/IInvitation";
import { travelogAgent } from './agent';

export const InvitationService = {
    list: getInvitations,
    accept: acceptInvitation,
    decline: declineInvitation,
}

async function getInvitations(): Promise<IInvitation[]>
{
    try
    {
        const response = await travelogAgent.get<IInvitation[]>('/Invite/List');
        return response.data;

    }
    catch (err)
    {
        throw err;

    }
}

async function acceptInvitation(invID: number): Promise<void>
{
    try
    {
        const response = await travelogAgent.post(`/Invite/Accept?inviteId=${invID}`);
        if (response.status < 200 || response.status > 300)
        {
            throw new Error(`${response.status}: Error deleting travel plan`);
        }

    }
    catch (err)
    {
        throw err;

    }
}

async function declineInvitation(invID: number): Promise<void>
{
    try
    {
        const response = await travelogAgent.post(`/Invite/Decline?inviteId=${invID}`);
        if (response.status < 200 || response.status > 300)
        {
            throw new Error(`${response.status}: Error deleting travel plan`);
        }

    }
    catch (err)
    {
        throw err;

    }
}
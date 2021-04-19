export interface IInvitation
{
    id: string;
    travelPlanName: string;
    inviterUsername: string;
    inviteeId: string;
    invitedById: string;
    travelPlanId: string;
    createdDate: Date;
    expirationDate: Date;
}
export interface IInvitation
{
    travelPlanName: string;
    inviterUsername: string;
    inviteeId: string;
    invitedById: string;
    travelPlanId: string;
    createdDate: Date;
    expirationDate: Date;
}
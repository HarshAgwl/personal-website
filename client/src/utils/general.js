export const makeCreatedOnUserFriendly = (createdOn) => 
    new Date(createdOn).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })

import {
    combineValidators,
    isRequired
  } from 'revalidate';


export const announcementValidator = combineValidators({
    title: isRequired({message: "Announcement Title is required"}),
    description: isRequired('Description')
})
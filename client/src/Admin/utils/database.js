const addNewToastNotification = (toastNotifications, notification) => {
    toastNotifications.update((notifications) => [
        ...notifications,
        notification
    ])
}

export const saveToDb = async(document, saveMethod, toastNotifications) => {
    const mode = "_id" in document ? "updated" : "created"
    console.log("REACHED HERE")
    const { data } = await saveMethod(document);
    if (mode === "created" && data._id) {
        addNewToastNotification(toastNotifications, {
                kind: "info",
                title: `Document ${mode} successfully`,
                caption: `Id of ${mode} document is ${data._id}`,
            })
    }
    else if(mode === "updated" && data.electionId){
        addNewToastNotification(toastNotifications, {
                kind: "info",
                title: `Document ${mode} successfully`,
                caption: `ElectionId of ${mode} document is ${data.electionId}`,
            })
    }
    else{
        addNewToastNotification(toastNotifications, {
                kind: "danger",
                title: `Couldn't save document`,
                caption: `The server might be down`,
            })
    }
    return data
}
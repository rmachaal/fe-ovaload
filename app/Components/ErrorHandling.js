import React from "react"

export default function ErrorHandling({error}) {
    const message = error ? error.message : "An unexpected error has occurred.";

    return (
        <View className="error-message">
        <Text>Something went wrong!</Text>
        <Text>{message}</Text>
    </View>
    )
}
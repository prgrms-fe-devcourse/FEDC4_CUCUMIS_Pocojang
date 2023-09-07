export interface RequestBodyNotificationCreateType {
	"notificationType": "COMMENT" | "FOLLOW" | "LIKE" | "MESSAGE",
	"notificationTypeId": string,
	"userId": string,
	"postId": null | string
}

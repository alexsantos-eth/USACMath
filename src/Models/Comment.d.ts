interface FileComment {
	comment: string
	file: number
	author: Partial<User>
	upload: Date
}

interface FileComments {
	id: number
	comments: FileComment[]
}

export interface ITable {
	moreLoading: any,
	pagination: any,
	data: any,
	filter: any,
	setFilter: (filter: any) => void,
	setPagination: (newPagination: any) => void,
}

export interface IModal {
	isModalVisible: boolean,
	handleOk: () => void,
	handleCancel: () => void,
	id: string,
}
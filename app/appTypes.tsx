
export type uiStateProps = {
    ui: {
        error: string,
        search:string,
        success: string,
        isLoading: boolean,
        isOpen: false,
        accountTab:string
    }
}

export type staffStateProps = {
    staff: {
        token: string,
        data: any,
        staffs: [],
    }
}

export type errorProps ={
    error: any
}


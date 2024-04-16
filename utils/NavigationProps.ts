
export type NavigationProps = {
    navigate: (screen: string, item?: any) => void,
    goBack: () => void,
    setParams: (params: any) => void,
    // Add any additional navigation methods or properties here
};
export interface InterfaceRepository {
  toastLoading: (id: string) => void;
  toastSuccess: (message: string) => void;
  toastError: (message: string) => void;
}

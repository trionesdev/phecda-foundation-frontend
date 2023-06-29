export interface PageRep<T> {
    rows: T[]
    pageSize?: number
    pageNum?: number
    total?: number
}

import sample from './template/sampleModel.json'

export class Model {
    private tabId: string
    private tabName: string
    private tabColor: string
    private url: Array<string>

    constructor(tabId: string, tabName: string, tabColor: string, url: Array<string>){
        this.tabId = tabId
        this.tabName = tabName
        this.tabColor = tabColor
        this.url = url
    } 

    public static makeSample(){
        console.log(`test`)
        console.log(`sample : ${sample}`)
    }
}

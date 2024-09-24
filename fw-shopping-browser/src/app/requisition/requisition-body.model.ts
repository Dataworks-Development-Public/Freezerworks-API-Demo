
interface AliquotSet {
    fieldName: string;
    aliquotsRequested: number[];
}

export class RequisitionBody {
    public aliquots: AliquotSet;
    public purpose: string;
    public shipToContactId: number;
    public customShipToAddress;

    constructor() {
        this.aliquots = {
            fieldName: "PK_AliquotUID",
            aliquotsRequested: []
        },
        this.purpose = "",
        this.shipToContactId = 0,
        this.customShipToAddress = {
            active: true,
            addressCountry: "",
            addressLocality: "",
            addressPostalCode: "",
            addressRegion: "",
            addressStateOrProvince: "",
            addressStreet: "",
            addressStreet2: "",
            cellNumber: "",
            custodian: false,
            email: "",
            faxNumber: "",
            filterString: "",
            firstName: "",
            freezerworksUser: true,
            fullName: "",
            fullNameOrganization: "",
            id: 0,
            lastName: "",
            organizationName: "",
            protocolContact: false,
            shipOrganization: "",
            shipToName: "",
            shippingContact: false,
            telephoneExtension: "",
            telephoneNumber: "",
            userId: 200009
        }
    }
}

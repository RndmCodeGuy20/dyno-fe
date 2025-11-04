export interface DnsRecord {
    id: string;
    userId: string;
    domainName: string;
    currentIPV4: string;
    currentIPV6: string;
    createdAt: Date;
    updatedAt: Date;
}
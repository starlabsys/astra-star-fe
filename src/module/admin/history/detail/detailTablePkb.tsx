import { Link } from '@nextui-org/link';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import React from 'react';
import { ListDatum } from '@/src/model/modelDetailHistory';

interface DetailTablePkbProps {
    data: ListDatum[];
}

const DetailTablePkb: React.FC<DetailTablePkbProps> = ({ data }) => {
    return (
        <>
            <Table aria-label="Detail History Table">
                <TableHeader>
                    <TableColumn>Nama Pemilik</TableColumn>
                    <TableColumn>Plat Nomor</TableColumn>
                    <TableColumn>Tipe Motor</TableColumn>
                    <TableColumn>Alamat</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Aksi</TableColumn>
                </TableHeader>
                <TableBody>
                    {data.map((item:ListDatum, index:number) =>(
                        <TableRow key={index}>
                            <TableCell>{item.namaPemilik}</TableCell>
                            <TableCell>{item.platNumber}</TableCell>
                            <TableCell>{item.typeMotor}</TableCell>
                            <TableCell>{item.alamat}</TableCell>
                            <TableCell>
                                <div className={`${item.status === 'SUCCESS' ? 'text-green-400' : 'text-orange-300'} font-semibold`}>
                                    {item.status}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Link color="primary" href="#">
                                    Detail Data
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                    {/* {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.createdAt}</TableCell>
                            <TableCell>{item.totalData ?? 0}</TableCell>
                            <TableCell>{item.totalDataSuccess ?? 0}</TableCell>
                            <TableCell>
                                <Link color="primary" href={`/history-pkb/${item.id}`}>
                                    Detail
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))} */}
                </TableBody>
            </Table>
        </>
    );
};

export default DetailTablePkb;

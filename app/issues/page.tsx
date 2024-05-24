import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import prisma from "@/prisma/client";
import IssueStatusBadge from '../components/IssueStatusBadge';
import delay from 'delay'
import IssuesAction from './IssuesAction';

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany()


  await delay(2000)
  return (
    <div>
      <IssuesAction />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created At</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
            {issues.map( (issue) => (
          <Table.Row key={issue.id}>
              <Table.Cell>
                {issue.title}
                <div className='block md:hidden'><IssueStatusBadge status={issue.status}/></div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell' ><IssueStatusBadge status={issue.status}/></Table.Cell>
              <Table.Cell className='hidden md:table-cell' >{issue.createdAt.toLocaleString()}</Table.Cell>
          </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>  
    </div>
  )
}

export default IssuesPage
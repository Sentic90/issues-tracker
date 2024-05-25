import { IssueStatusBadge, Link } from '@/app/components/';
import { Table, Box } from '@radix-ui/themes';
import prisma from "@/prisma/client";
import IssuesAction from './IssuesAction';

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany()

  return (
    <Box>
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
                <Link href={`/issues/${issue.id}`}>
                {issue.title}
                </Link>
                <Box className='block md:hidden'><IssueStatusBadge status={issue.status}/></Box>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell' ><IssueStatusBadge status={issue.status}/></Table.Cell>
              <Table.Cell className='hidden md:table-cell' >{issue.createdAt.toLocaleString()}</Table.Cell>
          </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>  
    </Box>
  )
}

export default IssuesPage
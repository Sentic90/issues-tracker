import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { FaEdit } from 'react-icons/fa'

const EditButtonIssue = ({ issueId}: { issueId:number}) => {
  return (
    <Button>
    <FaEdit />
    <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
  </Button>
  )
}

export default EditButtonIssue
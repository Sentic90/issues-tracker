"use client";

import { Button, Callout, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller} from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { BiInfoCircle } from 'react-icons/bi';


interface IssueForm { 
  title: string;
  description: string;
}
const NewIssuePage = () => {
  const router = useRouter()
  const [error, setError ] = useState("")
  const {register, control, handleSubmit} = useForm<IssueForm>()
  return (
    <div className="max-w-xl">

      { error && <Callout.Root color='red' className='mb-5'>
      <Callout.Icon>
    <BiInfoCircle />
  </Callout.Icon>
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
          router.push("/issues")
          } catch (error) {
            setError("An un expected error occured.")
          }
        })}
        >
          <TextField.Root
          {...register('title')}
          className='py-5 px-4'
          placeholder='Title of issue...'/>
          <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder="description" {...field}/>}
          />
      
          <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
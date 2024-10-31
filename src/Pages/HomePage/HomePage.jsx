import React from 'react'
import { Typography } from '@mui/material'
import FlexBetween from '../../Components/FlexBetween'
import { Navbar } from '../Navbar/Navbar'

const HomePage = () => {
  return (
    <FlexBetween flexDirection={'column'}>
      <Navbar />
    </FlexBetween>
  )
}

export default HomePage

const Content = () => {
  const styles = {
    root: {
      textAlign: 'center',
      padding: '32px'
    },
    title: {
      marginBottom: '16px'
    },
    description: {
      marginBottom: '32px'
    },
    button: {
      marginTop: '16px'
    }
  }
  return (
    <div style={styles.root}>
      <Typography variant='h4' style={styles.title}>
        Welcome to LLM Chat Hub!
      </Typography>
      <Typography variant='body1' style={styles.description}>
        Empower your legal research with our cutting-edge chatbot platform.
        Seamlessly interact with your legal documents, ask questions, and
        explore curated chats. From analyzing penalty laws to discussing case
        studies, our platform simplifies legal research like never before. Get
        started today and discover a smarter way to engage with your documents.
      </Typography>
    </div>
  )
}

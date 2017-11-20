import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  Button,
  TextInput,
} from '../Form'

storiesOf('Atoms/Form', module)
  .add('Button', () => <Button>TEXT</Button>)
  .add('TextInput', () => <TextInput value="asdf" />)

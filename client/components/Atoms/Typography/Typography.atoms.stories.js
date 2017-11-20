import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  BigHeader,
  SmallHeader,
} from '../Typography'

storiesOf('Atoms/Typography', module)
  .add('BigHeader', () => <BigHeader>DRAW WITH ME</BigHeader>)
  .add('SmallHeader', () => <SmallHeader>Start Now</SmallHeader>)

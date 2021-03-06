import React, { useState, useContext } from 'react'
import { Context } from '../../Context'
import firebase from '../firebase'

import { Wrap, Form, Title, Subtitle, ButtonsMeal, Textarea, Footer, AddProducts } from './styles'
import { Button } from '../Button'
import { Loader } from '../Loader'
import { SearchBox } from '../SearchBox'

export const MealForm = props => {
  const { user } = useContext(Context)

  /* / States / */
  const [type, setType] = useState('breakfast')
  const [breakfast, setBreakfast] = useState(props.breakfast ? props.breakfast : '')
  const [lunch, setLunch] = useState(props.lunch ? props.lunch : '')
  const [dinner, setDinner] = useState(props.dinner ? props.dinner : '')
  const [loading, setLoading] = useState(false)

  const handleSelect = (e, mealType) => {
    e.preventDefault()
    setType(mealType)
  }

  const handleUpdate = e => {
    e.preventDefault()
    setLoading(true)

    firebase.updateMenu(user.name, props.day, breakfast, lunch, dinner).then(() => {
      setLoading(false)
      props.handleClose()
    })
  }

  return (
    <Wrap>
      <Form onSubmit={handleUpdate}>
        <Title>{props.day}</Title>
        <Subtitle>Select the type of food and enter the food you like best for that moment!</Subtitle>

        <ButtonsMeal>
          <Button
            text='Breakfast'
            extraClass='margin-right-10'
            onClick={e => handleSelect(e, 'breakfast')}
            disabled={type === 'breakfast' ? true : null}
          />

          <Button
            text='Lunch'
            extraClass='margin-right-10'
            onClick={e => handleSelect(e, 'lunch')}
            disabled={type === 'lunch' ? true : null}
          />

          <Button
            text='Dinner'
            onClick={e => handleSelect(e, 'dinner')}
            disabled={type === 'dinner' ? true : null}
          />
        </ButtonsMeal>

        {type === 'breakfast' &&
          <Textarea
            placeholder='Your favorite meal for breakfast...'
            value={breakfast}
            onChange={e => setBreakfast(e.target.value)}
          />}

        {type === 'lunch' &&
          <Textarea
            placeholder='Your favorite meal for lunch...'
            value={lunch}
            onChange={e => setLunch(e.target.value)}
          />}

        {type === 'dinner' &&
          <Textarea
            placeholder='Your favorite meal for dinner...'
            value={dinner}
            onChange={e => setDinner(e.target.value)}
          />}

        <Footer>
          <Button text='Update your day' terciary big />
        </Footer>

        {loading && <Loader fullContainer opacityBg />}
      </Form>

      <AddProducts>
        <h5>Add a product for your shopping list</h5>
        <SearchBox placeholder='Add product to the list' validate />
      </AddProducts>
    </Wrap>
  )
}

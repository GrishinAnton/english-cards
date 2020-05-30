import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { userSelector} from '../SignIn/ducks'
 
const Dashboard = () => {
	const dispatch = useDispatch()
	const user = useSelector(userSelector)
	
	return <div>{`Hello ${user.email}`}</div>
}

export default Dashboard

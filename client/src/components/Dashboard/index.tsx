import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
 
import { fetchWrapper } from '../../utils/fetch'
 
const Dashboard = () => {
	const dispatch = useDispatch()

	const handler = async () => {
		console.log('here');
		
		const tt = await fetchWrapper('/profile', 'POST', {})
		console.log(tt);
		
	}
	
	return <div><Button onClick={handler}>Click</Button></div>
}

export default Dashboard

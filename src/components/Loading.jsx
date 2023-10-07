import React from 'react'
import classNames from "classnames";
import s from "./Loading.module.scss"

const Loading = ({ active= false}) => (
	<span className={classNames(s.container,
		{
			[s.active]: active
		})}>
		<span />
		<span />
		<span />
		<span />
	</span>
)
export default Loading;

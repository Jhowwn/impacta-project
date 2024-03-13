'use client'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Drawer from "../Drawer/Drawer";
import styles from "./Header.module.scss";

export function Header() {
	return (
		<header className={styles.header}>
			<Drawer />
			<h2 className={styles.title}>Compre +</h2>
			<AccountCircleIcon fontSize='large' />
		</header >
	);
}
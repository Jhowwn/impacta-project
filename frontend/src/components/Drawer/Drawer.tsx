'use client'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import ViewListIcon from '@mui/icons-material/ViewList'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import * as React from 'react'
import { ReactNode } from 'react'

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  interface ItemProps {
    name: string
    link: string
    icon: ReactNode
  }

  const Item: React.FC<ItemProps> = ({ name, link, icon }) => {
    return (
      <Link href={link}>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        </ListItem>
      </Link>
    )
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Item name="Home" link="/" icon={<HomeIcon />} />
        <Divider />
        <Item name="Novo Produto" link="/product" icon={<AddCircleIcon />} />
        <Divider />
        <Item
          name="Listar Produtos"
          link="/listProducts"
          icon={<ViewListIcon />}
        />
        <Divider />
      </List>
    </Box>
  )

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon color="secondary" fontSize="large" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}

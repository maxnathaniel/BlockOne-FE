import React, { useState, useCallback, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { MENU_ITEMS } from '../../constants';
import { MenuItem, MenuItemContainer, SidebarContainer } from './style';

const Sidebar: React.FC<{}> = () => {
  const URLs = {
    ['/']: true,
    ['/transactions']: false,
    ['/services']: false,
    ['/investment']: false,
    ['/loans']: false
  };

  const [urls, setUrls] = useState<any>(URLs);

  const onClick = useCallback((e: any) => {
    const menuItem = MENU_ITEMS[e.target.getAttribute('data-val')];
    const clickedItem = menuItem.key;
    // although this method of seriaizing and pasrsing the string creates
    // a deep copy object, note that it only works for simple object
    // for more complex object types, do use a library method
    const URLsCopy = JSON.parse(JSON.stringify(urls));

    for (const i in URLsCopy) {
      if (URLsCopy.hasOwnProperty(i)) {
        URLsCopy[i] = false;
        if (i === clickedItem) {
          URLsCopy[i] = true;
        }
      }
    }
    setUrls(URLsCopy);
  }, [urls]);

  return (
    <SidebarContainer>
      <MenuItemContainer>
        {
          Object.keys(MENU_ITEMS).map(item => (
            <MenuItem key={MENU_ITEMS[item].key} isSelected={urls[MENU_ITEMS[item].key]}>
              <Link data-val={item} to={`${MENU_ITEMS[item].key}`} onClick={onClick}>{MENU_ITEMS[item].name}</Link>
            </MenuItem>
          ))
        }
      </MenuItemContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
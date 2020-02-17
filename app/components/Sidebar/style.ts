import styled from '../../styles/styled-components';

interface ISidebarContainerProps {
  position: string;
  height: string;
  width: string;
}

interface IMenuItemsProps {
  isSelected: boolean;
}

export const Logo = styled.div`
  min-height: 200px;
  vertical-align: center;
  text-align: center;
`;

export const MenuItemContainer = styled.ul`
  margin: 0;
  padding: 0;

  @media all and (max-width: 800px) {
    display: flex;
    flex: 1 1 auto;
  }
`;

export const MenuItem = styled.li<IMenuItemsProps>`
  display: block;
  list-style: none;
  line-height: 50px;
  text-align: center;
  margin: 0;
  padding: 5px;
  color: #E0E3ED;
  background-color: ${props => props.isSelected ? '#272F4D' : '#131930'};

  &: hover {
    cursor: pointer;
    background-color: #272F4D;
  }

  > a {
    display: block;
    line-height: 50px;
    padding: 5px;
    color: #66FCF1;
  }

  @media all and (max-width: 800px) {
    display: inline-block;
    flex: 1 1 auto;
    min-width: max-content;

    > a {
      line-height: 20px;
    }
  }
`;

export const SidebarContainer: any = styled.div<ISidebarContainerProps>`
  position: absolute;
  height: 100%;
  width: 15%;
  background-color: #131930;

  @media all and (max-width: 800px) {
    bottom: 0;
    width: 100%;
    display: flex;
    height: 40px;
    z-index: 999;
    overflow: scroll;
  }
`;

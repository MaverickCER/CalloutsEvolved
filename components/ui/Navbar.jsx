import React, { createRef, useState } from 'react';

import Link from 'next/link';
import LogoIcon from '../../assets/LogoIcon.js';
import { useAuth } from '../../context/AuthContext.js';
import { useRouter } from 'next/router.js';

const Navbar = () => {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const skipRef = createRef(null);
  const [toggle, setToggle] = useState(false);
  const signOut = () => {
    setToggle(false);
    logout();
  };
  return (
    <>
      <header className='header__wrapper'>
        <section className='header__banner'>
          <button className='scroll__top' onClick={() => skipRef.current.focus()}>
            Skip to Content
          </button>
        </section>
        <section className='header__banner'>
          <Link href='/' className='header__logo'>
            <LogoIcon />
            &nbsp;Callouts&nbsp;Evolved
          </Link>
          <button className='header__logo-toggle' onClick={() => setToggle(!toggle)}>
            <span>
              <LogoIcon styles={{ width: '24px' }} />
              &nbsp;Callouts&nbsp;Evolved&nbsp;
            </span>
            <span aria-hidden='true'>&#9776;</span>
            <span className='sr-only'>Menu</span>
          </button>
          <nav
            className={`header__nav${toggle ? ' header__nav--open' : ''}`}
            style={{ backgroundColor: 'white' }}>
            <ul />
            <ul className='header__nav-menulist' role='tree'>
              <li className='header__nav-menuli' role='treeitem' aria-selected='false'>
                <Link href='/' className='header__nav-menulink' onClick={() => setToggle(false)}>
                  Home
                </Link>
              </li>
              <li className='header__nav-menuli' role='treeitem' aria-selected='false'>
                <Link
                  href='/blog'
                  className='header__nav-menulink'
                  onClick={() => setToggle(false)}>
                  Blog
                </Link>
              </li>
              <li className='header__nav-menuli' role='treeitem' aria-selected='false'>
                <Link
                  href='/guilds'
                  className='header__nav-menulink'
                  onClick={() => setToggle(false)}>
                  Guilds
                </Link>
              </li>
              <li className='header__nav-menuli' role='treeitem' aria-selected='false'>
                <Link href='/lfg' className='header__nav-menulink' onClick={() => setToggle(false)}>
                  LFG
                </Link>
              </li>
            </ul>
            {currentUser ? (
              currentUser.isAnonymous ? (
                <ul className='header__nav-menulist' role='tree'>
                  <li className='header__nav-menuli' role='treeitem' aria-selected='false'>
                    <button className='header__nav-menubtn' onClick={signOut}>
                      Log&nbsp;Out
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className='header__nav-menulist' role='tree'>
                  <li className='header__nav-menuli' role='treeitem' aria-selected='false'>
                    <Link
                      href={`/user/${currentUser.uid}`}
                      className='header__nav-menubtn'
                      onClick={() => setToggle(false)}>
                      Account
                    </Link>
                  </li>
                  <li className='header__nav-menuli' role='treeitem' aria-selected='false'>
                    <button className='header__nav-menubtn' onClick={signOut}>
                      Log&nbsp;Out
                    </button>
                  </li>
                </ul>
              )
            ) : (
              <ul className='header__nav-menulist' role='tree'>
                <li className='header__nav-menuli' role='treeitem' aria-selected='false'>
                  <Link
                    href='/sessions'
                    className='header__nav-menubtn'
                    onClick={() => setToggle(false)}>
                    Sessions
                  </Link>
                </li>
              </ul>
            )}
            <ul className='header__nav-end'>
              <li>
                <button ref={skipRef} aria-label='end of header nav' />
              </li>
            </ul>
          </nav>
        </section>
      </header>
    </>
  );
};

export default Navbar;

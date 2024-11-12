import { BiSolidDownArrow } from 'react-icons/bi';

import * as Styles from './styles';

import CustomButton from '@/components/CustomButton';
import { authActions } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const RightHeader = ({ handleShowModal }: { handleShowModal: () => void }) => {
  const loginSuccess = useAppSelector((state) => state.auth.isLoggedIn);
  const currentUser = useAppSelector((state) => state.auth.user);
  const currentAccount = useAppSelector((state) => state.auth.account);
  const dispatch = useAppDispatch();

  return (
    <Styles.RightHeaderWrapper>
      {loginSuccess ? (
        <Styles.UserInfo>
          <Styles.UserInfoImg>
            <img
              src={`${
                currentUser.avatar ||
                'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg'
              }`}
              alt="avatar"
            />
          </Styles.UserInfoImg>
          <Styles.UserInfoFullname>
            {currentUser.fullname}
          </Styles.UserInfoFullname>
          <BiSolidDownArrow />
          <Styles.UserInfoDropdown className="dropdown">
            {currentAccount.role.roleName === 'Admin' && (
              <Styles.UserInfoDropdownItem href="/admin">
                Admin Panel
              </Styles.UserInfoDropdownItem>
            )}
            <Styles.UserInfoDropdownItem href="/dashboard">
              Dashboard
            </Styles.UserInfoDropdownItem>
            <Styles.UserInfoDropdownItem href="/dashboard?tab=edit-profile">
              Edit Profile
            </Styles.UserInfoDropdownItem>
            <Styles.UserInfoDropdownItem href="/dashboard?tab=wish-list">
              Wish List
            </Styles.UserInfoDropdownItem>
            <Styles.UserInfoDropdownLogout
              onClick={() => {
                dispatch(authActions.logout());
              }}
            >
              Sign Out
            </Styles.UserInfoDropdownLogout>
          </Styles.UserInfoDropdown>
        </Styles.UserInfo>
      ) : (
        <CustomButton onClick={handleShowModal}>Login</CustomButton>
      )}
    </Styles.RightHeaderWrapper>
  );
};

export default RightHeader;

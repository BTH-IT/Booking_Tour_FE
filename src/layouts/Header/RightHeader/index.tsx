import CustomButton from '@/components/CustomButton';
import Currency from './Currency';
import Language from './Language';
import * as Styles from './styles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { BiSolidDownArrow } from 'react-icons/bi';
import { authActions } from '@/redux/features/auth/authSlice';

const RightHeader = ({ handleShowModal }: { handleShowModal: () => void }) => {
  const loginSuccess = useAppSelector((state) => state.auth.isLoggedIn);
  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  return (
    <Styles.RightHeaderWrapper>
      <Language />
      <Currency />
      {loginSuccess ? (
        <Styles.UserInfo>
          <Styles.UserInfoImg>
            <img
              src={`${
                currentUser.picture ||
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
            <Styles.UserInfoDropdownItem href="/">
              Dashboard
            </Styles.UserInfoDropdownItem>
            <Styles.UserInfoDropdownItem href="/">
              Edit Profile
            </Styles.UserInfoDropdownItem>
            <Styles.UserInfoDropdownItem href="/">
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

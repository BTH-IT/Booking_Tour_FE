import { Checkbox } from 'antd'
import styled from 'styled-components'

const ServicesWrapper = styled.div`
    box-shadow: 0px 20px 45px rgb(0 0 0 / 10%);
    padding: 30px;
    background-color: white;
    border-radius: 16px;
		display: flex;
		flex-direction: column;
		gap: 30px;
		span {
			font-size: 1.6rem;
		}
`

const ServicesTitle = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  color: black;
  margin-bottom: 30px;
`

const Services = () => {
  return (
    <>
			<ServicesTitle>Please select your preferred additional services</ServicesTitle>
			<ServicesWrapper>
				<Checkbox name="clean" checked>
					Cleaning fee - $9 / Room
				</Checkbox>
				<Checkbox name="tip" checked>
					Tip for tour guide - $20 / Person
				</Checkbox>
				<Checkbox name="entrance">
					Entrance Ticket - $15 / Person
				</Checkbox>
				<Checkbox name="lunch">
					Lunch Meal - $12 / Person
				</Checkbox>
			</ServicesWrapper>
    </>
  )
}

export default Services

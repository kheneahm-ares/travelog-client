import moment from 'moment'
import React from 'react'
import { Header, Item, Segment } from 'semantic-ui-react'
import { ITravelPlan } from '../../../app/common/interfaces/ITravelPlan'

interface IProps
{
    travelPlan: ITravelPlan
}
export const TravelPlanDetailHeader: React.FC<IProps> = ({travelPlan}) => {
    return (
        <Segment.Group>
            <Segment textAlign='left' color='teal'>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Header size="huge" content={travelPlan.name}/>
                            <p>{moment(new Date(travelPlan.startDate)).format('yyyy-MM-DD')}</p>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Segment.Group>
    )
}

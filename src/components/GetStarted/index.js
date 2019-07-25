import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import { GetStartedCategoriesData } from "../../utility/constants/GetStartedCategories";
import Category from "./Category";
import { useStyles } from "./styles";

const GetStarted = ({ classes }) => {
	return(
		<Grid container spacing={24} className={classes.GetStartedMainContaienr}>
			<Grid item xs={12} sm={12} md={12} lg={12} className={classes.TopSection}>
				<h2>One Powerful AI Marketplace Solution</h2>
				<p>The AI Marketplace is a secure and distributed platform for using and building AI applications. This radically compresses time-to-deployment while also democratizing the use of AI throughout your organization.</p>
			</Grid>
			{
				GetStartedCategoriesData.map(item => (
					<Category 
						icon={item.categoryIcon} 
						title={item.categoryTitle} 
						description={item.categoryDescription} 
						tabsTitle={item.categoryTabs} 
						tabsContent={item.categoryTabsContent}
					/>		
				))
			}
			
		</Grid>
	)
}

export default withStyles(useStyles)(GetStarted);
import getCurrentUser from '../actions/getCurrentUser'
import getFavoriteListings from '../actions/getFavoriteListings'

import EmptyState from '../Components/EmptyState'
import FavoritesClient from './FavoritesClient'

const ListingPage = async () => {
  const currentUser = await getCurrentUser()
  const listings = await getFavoriteListings()

  // if (!currentUser) {
  //   return <EmptyState title='Unauthorized' subtitle='Please login' />
  // }

  if (listings.length === 0) {
    return (
      <EmptyState
        title='No favorites found'
        subtitle='Looks like you have no favorite listings'
      />
    )
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />
}

export default ListingPage

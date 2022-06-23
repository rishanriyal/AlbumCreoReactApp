import React, {Component} from 'react';
import {Link} from "react-router-dom";

import api from '../../api';

// Styles
import {photosPage, titleBar, closeBtn, heading1} from './Page.module.scss';

// Import view-components
import PhotoList from '../../components/Photos/PhotoList';
import PhotoFullSize from "../../components/Photos/PhotoFullSize";

// HOC
import withLoader from '../../hoc/withLoader';
import Aux from '../../hoc/Auxx';
const AuxWithLoader = withLoader(Aux);


class PhotosPage extends Component {
    constructor(props) {
        super(props);
        const {match} = this.props;

        this.state = {
            album: {
                id: match.params.id,
                title: null
            },
            photos: [],
            loading: false,
            imgFullSize: false,
            fullSizeURL: null
        };
    }

    async componentDidMount() {
        // Loading data
        this.setState({...this.state, loading: true});

        // Get album data from api
        const album = await this.getAlbum(this.state.album.id);
        const {id, title} = album;

        const albumState = {id, title};

        // Get all photos from album
        const photos = await this.getAlbumPhotos(id);

        this.setState({album: albumState, photos, loading: false});
    }

    getAlbum = async id => {
        // TODO - redirect or throw error if album doesn't exist
        const album = await api.get(`albums/${id}`);
        return album.data;
    };


    getAlbumPhotos = async albumId => {
        const photos = await api.get(`photos?albumId=${albumId}`);
        return photos.data;
    };

    displayFullSize = url => {
        this.setState({...this.state, imgFullSize: true, fullSizeURL: url});
    };

    closeFullSize = () => {
      this.setState({...this.state, imgFullSize: false, fullSizeURL: null});
    };

    render() {
        return (
            <main>
                <AuxWithLoader loading={this.state.loading}>
                    <div className={titleBar}>
                        <h1 className={heading1}>Album: {this.state.album.title}</h1>
                        <Link className={closeBtn} to='/'>Close X</Link>
                    </div>

                    <div className={photosPage}>
                        <PhotoList photos={this.state.photos} photoClick={this.displayFullSize} />
                    </div>
                </AuxWithLoader>

                <PhotoFullSize show={this.state.imgFullSize} url={this.state.fullSizeURL}
                    close={this.closeFullSize} />
            </main>
        )
    }
}

export default PhotosPage;
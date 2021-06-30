import React from 'react';
import styles from './InfluencerDetailStyle';
import InfDetailCard from './InfDetailCard';
import withStyles from '@material-ui/core/styles/withStyles';
import AlertModalDialog from "components/AlertModalDialog";
import { getInfluencerById, exportInfluencer, patchInfluencer } from 'apis/api';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SocialMetrics from './SocialMetrics';
import { injectIntl } from 'react-intl';
import Breadcrumbs from "components/Breadcrumbs";
import {
  getCollections,
  patchCollection,
  postCollection,
} from 'apis/api';
import Tracker from 'apis/tracker';
import FbTracker from 'apis/fbtracker';
import { connect } from 'react-redux';
import {
  dispatchNotification
} from 'reducers/NotificationReducer';
import {
  updateRouteParams,
  fromDiscoverPage
} from 'reducers/BreadcrumbsReducer';
import PLATFORMS from 'constants/platforms';
import { dispatchFetchResult } from 'reducers/FetchResultReducer';
import {
  openLoading,
  closeLoading
} from 'reducers/ScreenLoadingReducer';
import AddAlert from '@material-ui/icons/AddAlert';
class InfluencerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      influencer: {
        "id": "5b150fac5be4d6b11c291393",
        "state": "Approved",
        "name": "Influencer Name",
        "career": [
          {
            "id": "5bf548776daa850016d2d6e3",
            "name": "Football Player",
            "influencerType": ""
          }
        ],
        "type": "Micro",
        "location": "Thanh Hóa Province",
        "birthYear": 1997,
        "gender": "male",
        "phoneNumber": "",
        "email": "",
        "collections": [
          "5be013209f95f5001a64d703",
          "5be40970debc850016c81fcf",
          "5c10dfd1054eda0016538da4",
          "5c120a459ed8ac0016192526",
          "5bf38a83556e0f00153193d3",
          "5b73bf60eb01e000240256e6",
          "5be409b182248400169fcf64",
          "5c0f73a14b275500169aeb2f",
          "5c11e9da128d7500154228c7",
          "5c1758bdf890690016649839",
          "5c1758de3e617e001a918cf2",
          "5c175d28fc5a6600197cd00e",
          "5c176c06f89069001664983a",
          "5c178925f89069001664983d",
          "5c177e72f89069001664983c",
          "5c187920f890690016649841",
          "5c1758cf3e617e001a918cf0",
          "5c178915fc5a6600197cd015",
          "5c18c922f89069001664984c",
          "5c19ed4cc0ab660016d042a0",
          "5c1b442f075f080016372a90",
          "5c1b43d1b5f7aa0016affb7f",
          "5c19e9564dfb2000169a4ce0",
          "5c19e7be4dfb2000169a4cde",
          "5c20ad14c3d02e0015fc2158",
        ],
        "categories": [
          {
            "id": "5bf540095cd1ea0016c1aafc",
            "categoryName": "Sport",
            "ressonancePoint": 100
          },
          {
            "id": "5bb1dd0eaa1dea00169e0c8f",
            "categoryName": "Entertainment",
            "ressonancePoint": 100
          },
          {
            "id": "5bb1edf9aa1dea00169e0c93",
            "categoryName": "Fashion",
            "ressonancePoint": 100
          },
          {
            "id": "5bf53e2772608700166fb8d0",
            "categoryName": "Physical Wellness",
            "ressonancePoint": 100
          },
          {
            "id": "5c33178013b5bf001626faa6",
            "categoryName": "Agricuture",
            "ressonancePoint": 80
          },
          {
            "id": "5c6fa20a1fc03f0025ee7d23",
            "categoryName": "Yellow",
            "ressonancePoint": 80
          }
        ],
        "photoUrl": "https://storage.googleapis.com/yn-influencer/Avatar%20Default.png",
        "maritalStatus": "Single",
        "platformDetail": {
          "facebook": {
            "totalEngagement": ""
          },
          "fb": {
            "id": "0100004681360899",
            "totalFollowers": 3243921,
            "avgEngagement": 54104,
            "totalReactions": 629032,
            "totalComments": 14993,
            "totalShares": 5223,
            "totalPosts": 12,
            "demographicsLocation": {
              "Hà Nam Province": 0.6752578285557228,
              "Ninh Bình Province": 0.10994022000537207,
              "Cao Bằng Province": 0.29608900160537704,
              "Bình Định Province": 1.0775390881208344,
              "Bình Phước Province": 0.8770231186792182,
              "Bà Rịa–Vũng Tàu Province": 1.5204232698470206,
              "Điện Biên Province": 0.23362296751141567,
              "Kiên Giang Province": 1.0769144277798948,
              "Đắk Lắk Province": 1.7165666169020595,
              "Bạc Liêu Province": 0.6002985876429692,
              "Khánh Hòa Province": 0.3779195062684665,
              "Hà Tĩnh Province": 1.42422557734232,
              "Bình Thuận Province": 0.8813957410657954,
              "Phú Yên Province": 0.6377782080993459,
              "Kon Tum Province": 0.30046162399195436,
              "Nghệ An Province": 2.381829880002748,
              "Bắc Ninh Province": 1.7552955580403156,
              "Đồng Tháp Province": 0.5003529330926308,
              "Thái Bình Province": 1.558527550644337,
              "Yên Bái Province": 0.5828080980966599,
              "Quảng Ninh Province": 1.5335411370067527,
              "Bắc Kạn Province": 0.22425306239732146,
              "Đồng Nai Province": 3.0670822740135053,
              "Lào Cai Province": 0.5784354757100827,
              "Tiền Giang Province": 1.2586905869933223,
              "Quảng Ngãi Province": 0.772080181401363,
              "Hưng Yên Province": 1.139380461873856,
              "Cần Thơ City": 1.9426936603221998,
              "Bắc Giang Province": 1.6434813570121245,
              "Nam Định Province": 1.1499996876698295,
              "Phú Thọ Province": 1.1712381392617763,
              "Trà Vinh Province": 0.0443508842067126,
              "Đắk Nông Province": 0.23424762785235528,
              "Thanh Hóa Province": 4.763035099664557,
              "Hồ Chí Minh City": 18.121396490658203,
              "Ninh Thuận Province": 0.38978805274631917,
              "Long An Province": 1.0806623898255323,
              "Hòa Bình Province": 0.7764528037879403,
              "Tuyên Quang Province": 0.645898792531561,
              "An Giang Province": 1.2793043782443296,
              "Hà Giang Province": 0.3373165841073916,
              "Tây Ninh Province": 0.9888373197074091,
              "Hậu Giang Province": 0.21238451591946877,
              "Thái Nguyên Province": 1.578516681554405,
              "Vĩnh Phúc Province": 0.572813532641626,
              "Sơn La Province": 0.4828624435463217,
              "Lai Châu Province": 0.17490489546309196,
              "Vĩnh Long Province": 0.8420421395865997,
              "Cà Mau Province": 0.8114337828805588,
              "Hải Dương Province": 1.874605683159782,
              "Bình Dương Province": 2.1906838156752264,
              "Quảng Bình Province": 0.7620856159463292,
              "Sóc Trăng Province": 0.08245516500402905,
              "Hà Nội City": 19.27639346105555,
              "Quảng Trị Province": 0.42539369217987716,
              "Bến Tre Province": 0.9700975094792206,
              "Lâm Đồng Province": 0.7870720295839138,
              "Hải Phòng City": 2.5292497204644975,
              "Gia Lai Province": 0.9120040977718366,
              "Lạng Sơn Province": 0.6989949215114282,
              "Thừa Thiên–Huế Province": 1.7521722563356175,
              "Quảng Nam Province": 1.3211566210872838,
              "Đà Nẵng City": 0.016241168864429965
            },
            "demographicsAge": {
              "35-44": 0.3640467838845673,
              "65-74": 0.0071924136633729095,
              "25-34": 21.829528730926274,
              "18-24": 77.67862082701691,
              "45-54": 0.03596206831686455,
              "75+": 0.038175118674825446,
              "< 18": 0.038728381264315666,
              "55-64": 0.007745676252863134
            },
            "demographicsEducation": {
              "1": 42.03134296239098,
              "3": 56.81861336506449,
              "5": 1.150043672544527
            },
            "demographicsJob": {
              "0": 11.761549343870433,
              "1": 25.893946046148592,
              "2": 0.6219815600761013,
              "3": 29.262403044050927,
              "4": 11.6005658812625,
              "5": 20.859554124591444
            },
            "demographicsGender": {
              "male": 29.954601366005246,
              "female": 70.04539863399476
            },
            "totalFollowers4w": 3198654,
            "sentimentRate": 86,
            "engagementRate": 100,
            "reachRate": 100,
            "followerGrowthByPercentage": 0.014151890138789628,
            "influenceScore": [
              {
                "categoryId": "5bb1dd0eaa1dea00169e0c8f",
                "score": 81,
                "categoryName": "Entertainment"
              },
              {
                "categoryId": "5bb1edf9aa1dea00169e0c93",
                "score": 85,
                "categoryName": "Fashion"
              }
            ],
            "trueResonance": [
              {
                "categoryId": "5bb1dd0eaa1dea00169e0c8f",
                "score": 40,
                "categoryName": "Entertainment"
              },
              {
                "categoryId": "5bb1edf9aa1dea00169e0c93",
                "score": 54,
                "categoryName": "Fashion"
              }
            ],
            "interactionInactivePercent": 13,
            "followerInactivePercent": 13,
            "followersHistory": [
              {
                "total_followers": 3198654,
                "timestamp": "2019-02-06"
              },
              {
                "total_followers": 3201569,
                "timestamp": "2019-02-07"
              },
              {
                "total_followers": 3204667,
                "timestamp": "2019-02-08"
              },
              {
                "total_followers": 3207512,
                "timestamp": "2019-02-09"
              },
              {
                "total_followers": 3210137,
                "timestamp": "2019-02-10"
              },
              {
                "total_followers": 3212530,
                "timestamp": "2019-02-11"
              },
              {
                "total_followers": 3216257,
                "timestamp": "2019-02-12"
              },
              {
                "total_followers": 3218009,
                "timestamp": "2019-02-13"
              },
              {
                "total_followers": 3218010,
                "timestamp": "2019-02-14"
              },
              {
                "total_followers": 3219598,
                "timestamp": "2019-02-15"
              },
              {
                "total_followers": 3222936,
                "timestamp": "2019-02-16"
              },
              {
                "total_followers": 3224432,
                "timestamp": "2019-02-17"
              },
              {
                "total_followers": 3224701,
                "timestamp": "2019-02-18"
              },
              {
                "total_followers": 3226740,
                "timestamp": "2019-02-19"
              },
              {
                "total_followers": 3231725,
                "timestamp": "2019-02-20"
              },
              {
                "total_followers": 3231671,
                "timestamp": "2019-02-21"
              },
              {
                "total_followers": 3232768,
                "timestamp": "2019-02-22"
              },
              {
                "total_followers": 3235394,
                "timestamp": "2019-02-23"
              },
              {
                "total_followers": 3236963,
                "timestamp": "2019-02-24"
              },
              {
                "total_followers": 3236971,
                "timestamp": "2019-02-25"
              },
              {
                "total_followers": 3237940,
                "timestamp": "2019-02-26"
              },
              {
                "total_followers": 3239123,
                "timestamp": "2019-02-27"
              },
              {
                "total_followers": 3239997,
                "timestamp": "2019-02-28"
              },
              {
                "total_followers": 3242274,
                "timestamp": "2019-03-01"
              },
              {
                "total_followers": 3242880,
                "timestamp": "2019-03-02"
              }
            ],
            "totalFollowersGrowth4w": 45267,
            "totalEngagement": 649248
          },
          "insta": {
            "totalEngagement": ""
          },
          "page": {
            "totalEngagement": ""
          },
          "youtube": {
            "totalEngagement": ""
          }
        },
        "size": "mega",
        "kind": "celebrity",
        "latestSubmittedDate": "2019-01-16T03:32:41.643Z",
        "latestSubmittedUser": "test1@younetco.com",
        "latestApprovedDate": "2019-02-22T07:23:07.890Z",
        "latestApprovedUser": "loanlk_admin@younetco.com"
      }
      ,
      tabNetwork: 0,
      platform: 'fb',
      collections: [],
      openModal: false,
      trueGetInfluencerFromAPI: false,
      openExceedNumberOfInfluencerModal: false,
      openExceedNumberOfExportModal: false
    }
  }
  componentDidMount() {
    Tracker.pageview();
    FbTracker.pageview();
    const { id } = this.props.match.params;
    this.props.updateRouteParams(this.props.name, this.props.location)
    this.props.openLoading()
    getInfluencerById(id, res => {
      this.setState({
        influencer: res.results,
        trueGetInfluencerFromAPI: true,
      })
      Object.keys(res.results.platformDetail).filter(platformK =>
        res.results.platformDetail[platformK] &&
        ['fb', 'page', 'youtube', 'insta'].includes(platformK) &&
        // (res.results.platformDetail[platformK]).hasOwnProperty("totalFollowers")
        ((res.results.platformDetail[platformK]).hasOwnProperty("totalFollowers") ||
          (res.results.platformDetail[platformK]).hasOwnProperty("followerInactivePercent"))
      ).map(platformK => (
        this.setState({ platform: platformK })
      ))

      getCollections(
        'page_size=10000&page_index=0&owner=1',
        false,
        ({ data }) => {
          this.setState({
            collections: data.map((item) => ({
              ...item,
              selected: res.results.collections ? res.results.collections.indexOf(item.id) >= 0 : false
            }))
          }, () => this.props.closeLoading());
        }
      ).catch(({ status }) => {
        this.props.closeLoading();
        this.props.dispatchFetchResult(status)
      })
    }).catch(({ status }) => {
      this.props.closeLoading();
      if (status === 333) {
        this.setState({
          openModal: true
        })
      } else {
        this.props.dispatchFetchResult(status)
      }
    });

    this.props.minimizeSidebar(true, 'permanent');
  }
  componentWillUnmount() {
    this.props.closeLoading()
  }
  onCollectionSelect = (updatedCollection, { id, name }, selected) => {
    this.props.openLoading()
    const { platform, intl } = this.state;
    this.setState({
      collections: updatedCollection
    }, () => {
      patchCollection(
        {
          id,
          list_ids: [this.props.match.params.id],
          list_ids_action: selected ? intl.formatMessage({ defaultMessage: 'add'}) : intl.formatMessage({ defaultMessage: 'remove'}),
          platform
        },
        () => {
          this.props.closeLoading()
          this.props.dispatchNotification({
            open: true,
            icon: AddAlert,
            color: 'success',
            message: `${selected ? intl.formatMessage({ defaultMessage: 'Added to'}) : intl.formatMessage({ defaultMessage: 'Removed from'})} collection ${name} successfully`
          })
        }
      ).catch(({ status }) => {
        this.props.closeLoading()
        if (status === 340) {
          this.setState({
            openExceedNumberOfInfluencerModal: true
          })
        } else {
          this.props.dispatchFetchResult(status)
        }
      })
    })
  }
  addCollection = (collectionName) => {
    this.props.openLoading()
    postCollection({ name: collectionName }, ({ name, owner, _id: id, last_updated_date: lastUpdatedDate }) => {
      const newCollections = [{ name, id, owner, lastUpdatedDate, selected: false, intl }, ...this.state.collections]
      this.setState({
        collections: newCollections
      }, () => this.props.closeLoading() && this.props.dispatchNotification({
        open: true,
        icon: AddAlert,
        color: 'success',
        message: intl.formatMessage({ defaultMessage: `Collection {collectionName} is created.` } ,{collectionName : collectionName})
      }))
    }).catch(({ status }) => this.props.dispatchFetchResult(status));
  }
  closeDialog = () => {
    this.setState({
      openModal: false,
    }, () => this.props.history.push("/advanced-search?page_size=12&page_index=0&platform=fb"))
  }
  closeExceedNumberOfInfluencerDialog = () => {
    this.setState({
      openExceedNumberOfInfluencerModal: false,
    }, () => this.props.history.push("/advanced-search?page_size=12&page_index=0&platform=fb"))
  }
  closeExceedNumberOfExportDialog = () => {
    this.setState({
      openExceedNumberOfExportModal: false,
    })
  }

  render() {
    const { classes, name, routeCollectionName, sideBarState, bcRoutes, isFromDiscoverPage, userInfo } = this.props;
    const intl = this.props.intl;
    const { influencer, collections, platform, openModal, openExceedNumberOfInfluencerModal, openExceedNumberOfExportModal, trueGetInfluencerFromAPI } = this.state;

    const socialMetrics = influencer &&
      Object.keys(influencer.platformDetail).filter(platformK =>
        influencer.platformDetail[platformK] &&
        ['fb', 'page', 'youtube', 'insta'].includes(platformK) &&
        // (influencer.platformDetail[platformK]).hasOwnProperty("totalFollowers")
        ((influencer.platformDetail[platformK]).hasOwnProperty(intl.formatMessage({ defaultMessage: "totalFollowers"})) ||
          (influencer.platformDetail[platformK]).hasOwnProperty(intl.formatMessage({ defaultMessage: "followerInactivePercent"})))
      ).map(platformK => {
        return (<SocialMetrics
          platform={platformK === 'youtube' ? 'youtube' : (platformK === 'insta' ? 'insta' : 'facebook')}
          isFacebook={platformK === 'fb' || platformK === 'page'}
          showTooltip={platformK === 'fb'}
          hasPermissionViewOverall={userInfo.globalPermissions.canViewInfluencerOverallPerformance || false}
          size={influencer.size}
          {...influencer.platformDetail[platformK]}
          categories={influencer.categories}
          overallPerformanceOneWeek={influencer.platformDetail[platformK].overallPerformanceOneWeek ? influencer.platformDetail[platformK].overallPerformanceOneWeek : {}}
          overallPerformanceTwoWeek={influencer.platformDetail[platformK].overallPerformanceTwoWeek ? influencer.platformDetail[platformK].overallPerformanceTwoWeek : {}}
          overallPerformanceOneMonth={influencer.platformDetail[platformK].overallPerformanceOneMonth ? influencer.platformDetail[platformK].overallPerformanceOneMonth : {}}
          overallPerformanceThreeMonth={influencer.platformDetail[platformK].overallPerformanceThreeMonth ? influencer.platformDetail[platformK].overallPerformanceThreeMonth : {}}
          tagCloud={platformK === 'fb' || platformK === 'page' ? influencer.platformDetail[platformK].tagCloud : []}
        />)
      })
    return (
      <div className={classes.mainDiv}>
        <AlertModalDialog
          open={openModal}
          onCloseClick={this.closeDialog}
          onClickButton={this.closeDialog}
          content={intl.formatMessage({ defaultMessage: "You've exceeded the maximum of number detailed profile viewing. Please contact us for further support & information."})}
        />
        <AlertModalDialog
          open={openExceedNumberOfInfluencerModal}
          onCloseClick={this.closeExceedNumberOfInfluencerDialog}
          onClickButton={this.closeExceedNumberOfInfluencerDialog}
          content={intl.formatMessage({ defaultMessage: "You've exceeded the maximum number of profile can be added to a collection. Please contact us for further support & information."})}
        />
        <AlertModalDialog
          open={openExceedNumberOfExportModal}
          onCloseClick={this.closeExceedNumberOfExportDialog}
          onClickButton={this.closeExceedNumberOfExportDialog}
          content={intl.formatMessage({ defaultMessage: "You've exceeded the maximum number of profile can be exported. Please contact us for further support & information."})}
        />
        {influencer && this.props.drawHeader({
          name: <Breadcrumbs name={name} influencerName={influencer.name} routeCollectionName={routeCollectionName} bcRoutes={bcRoutes} isFromDiscoverPage={isFromDiscoverPage} />,
        })}
        {influencer && (
          <React.Fragment>
            <InfDetailCard
              {...influencer}
              facebookId={Object.keys(influencer.platformDetail.fb).length > 2 ? influencer.platformDetail['fb'].id : null}
              pageId={Object.keys(influencer.platformDetail.page).length > 2 ? influencer.platformDetail['page'].id : null}
              youtubeId={Object.keys(influencer.platformDetail.youtube).length > 2 ? influencer.platformDetail['youtube'].id : null}
              instaUserName={Object.keys(influencer.platformDetail.insta).length > 2 ? influencer.platformDetail['insta'].userName : null}
              onCollectionSelect={this.onCollectionSelect}
              addCollection={this.addCollection}
              platform={platform}
              platformCategories={influencer.platformCategories}
              collections={collections}
              isDemoAccount={userInfo.globalPermissions.isDemoAccount || false}
              onExport={() => exportInfluencer(
                `/api/v1/download-influencers/${
                this.props.match.params.id
                }?platform=${platform}&download=1&file_name=${
                encodeURIComponent(influencer.name)
                }`,
                blob => {
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${influencer.name}.xlsx`;
                  document.body.appendChild(a);
                  a.click();
                }
              ).catch(({ status }) => {
                if (status === 344) {
                  this.setState({
                    openExceedNumberOfExportModal: true
                  })
                } else {
                  this.props.dispatchFetchResult(status)
                }
              })}
              onEdit={() => this.props.history.push(`/influencer/${influencer.id}`)}
              onApprove={() => {
                patchInfluencer(influencer.id, {
                  state: 'Approved'
                }, () => {
                  const { id } = this.props.match.params;
                  getInfluencerById(id, res => this.setState({ influencer: res.results }, () =>
                    this.props.dispatchNotification({
                      open: true,
                      icon: AddAlert,
                      color: 'success',
                      message: intl.formatMessage({ defaultMessage: `Changed state to "Approved" successfully`})
                    }))).catch(({ status }) => {
                      this.props.closeLoading()
                      this.props.dispatchFetchResult(status)
                    })
                }).catch(({ status }) => {
                  this.props.closeLoading()
                  this.props.dispatchFetchResult(status)
                })
              }}
              onReject={() => {
                patchInfluencer(influencer.id, {
                  state: 'Rejected'
                }, () => {
                  const { id } = this.props.match.params;
                  getInfluencerById(id, res => this.setState({ influencer: res.results }, () =>
                    this.props.dispatchNotification({
                      open: true,
                      icon: AddAlert,
                      color: 'success',
                      message: intl.formatMessage({ defaultMessage: `Changed state to "Rejected" successfully`})
                    }))).catch(({ status }) => {
                      this.props.closeLoading()
                      this.props.dispatchFetchResult(status)
                    })
                }).catch(({ status }) => {
                  this.props.closeLoading()
                  this.props.dispatchFetchResult(status)
                })
              }}
              onUpdate={() => {
                patchInfluencer(influencer.id, {
                  state: 'NeedToUpdate'
                }, () => {
                  const { id } = this.props.match.params;
                  getInfluencerById(id, res => this.setState({ influencer: res.results }, () =>
                    this.props.dispatchNotification({
                      open: true,
                      icon: AddAlert,
                      color: 'success',
                      message: intl.formatMessage({ defaultMessage: `Changed state to "Need To Update" successfully`})
                    }))).catch(({ status }) => {
                      this.props.closeLoading()
                      this.props.dispatchFetchResult(status)
                    })
                }).catch(({ status }) => {
                  this.props.closeLoading()
                  this.props.dispatchFetchResult(status)
                })
              }}
            />
            {influencer && (<Tabs classes={{ indicator: classes.tabsIndicator }} className={classes.tabs} value={this.state.tabNetwork} onChange={(e, tabNetwork) => this.setState({ tabNetwork })}>
              {
                Object.keys(influencer.platformDetail).filter(platformK =>
                  influencer.platformDetail[platformK] &&
                  ['fb', 'page', 'youtube', 'insta'].includes(platformK) &&
                  // (influencer.platformDetail[platformK]).hasOwnProperty("totalFollowers")
                  ((influencer.platformDetail[platformK]).hasOwnProperty(intl.formatMessage({ defaultMessage: "totalFollowers"})) ||
                    (influencer.platformDetail[platformK]).hasOwnProperty(intl.formatMessage({ defaultMessage: "followerInactivePercent"})))
                ).map(platformK => (
                  <Tab key={platformK} classes={{ root: classes.tabRoot, selected: classes.selectedTab, labelContainer: classes.tabLabelContainer }} label={PLATFORMS[platformK]} />
                ))
              }
            </Tabs>)}
            {influencer && trueGetInfluencerFromAPI ? socialMetrics[this.state.tabNetwork] : <div />}
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default injectIntl (
  connect(
    ({ breadcrumbs, userInfo }) => ({ userInfo, ...breadcrumbs }), {
    dispatchNotification,
    updateRouteParams,
    fromDiscoverPage,
    openLoading,
    closeLoading,
    dispatchFetchResult
  })
    (withStyles(styles)(InfluencerDetail))
) ;

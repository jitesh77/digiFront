import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import config from "../../shared/config/config";
import { User } from "../../shared/models/user.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  /* ============================================================
     ==================== user login ====================*/
  userLogin(credentials): Observable<any> {
    const body = new HttpParams()
      .set("email", credentials.email)
      .set("password", credentials.password);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/login`, body, {
      headers: header,
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== user signup ====================*/
  userSignup(credentials): Observable<any> {
    const body = new HttpParams()
      .set("email", credentials.email)
      .set("password", credentials.password)
      .set("confirmPassword", credentials.confirmPassword);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/signup`, body, {
      headers: header,
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== user logout ====================*/
  userLogout() {
    let enco: any = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    return this.http.get(`${config.url}/logout`, {
      headers: enco,
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== get currentUser ====================*/

  currentUser(): Observable<any> {
    return this.http.get(`${config.url}/currentUser`, {
      withCredentials: true
    });
  }

  /* ============================================================
    ==================== post user details ====================*/
  postDetails(credentials): Observable<any> {
    console.log(credentials);
    const body = new HttpParams()
      .set("username", credentials.username)
      .set("firstname", credentials.firstname)
      .set("lastname", credentials.lastname)
      .set("gender", credentials.gender)
      .set("country", credentials.country)
      .set("description", credentials.description)
      .set("id", credentials.id)
      .set("tagline", credentials.tagline)
      .set("profilePicture", credentials.profilePicture);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/addDetails`, body, {
      headers: header,
      withCredentials: true
    });
  }

  /* ============================================================
    ==================== update user details ====================*/
  postUpdateDetails(credentials): Observable<any> {
    console.log(credentials);
    const body = new HttpParams()
      .set("firstname", credentials.firstname)
      .set("lastname", credentials.lastname)
      .set("gender", credentials.gender)
      .set("country", credentials.country)
      .set("description", credentials.description)
      .set("id", credentials.id)
      .set("hourlyRate", credentials.hourlyRate)
      .set("tagline", credentials.tagline)
      .set("profilePicture", credentials.profilePicture)
      .set("skills", JSON.stringify(credentials.skills));
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/postUpdateDetails`, body, {
      headers: header,
      withCredentials: true
    });
  }
  // /* ============================================================
  //    ==================== reset password====================*/
  // resetPassword(email): Observable<any> {
  //   const body = new HttpParams().set("email", email);
  //   let header: any = new HttpHeaders({
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   });
  //   return this.http.post(`${config.url}/forgot`, body, {
  //     headers: header
  //   });
  // }

  /* ============================================================
     ==================== find username ====================*/
  findUsername(username): Observable<any> {
    return this.http.get(`${config.url}/findUsername/${username}`);
  }

  /* ============================================================
     ==================== post microjob====================*/
  postMicrojob(value): Observable<any> {
    const body = new HttpParams()
      .set("title", value.title)
      .set("description", value.description)
      .set("brDescription", value.brDescription)
      .set("price", value.price)
      .set("duration", value.duration)
      .set("category", JSON.stringify(value.category))
      .set("subCategory", JSON.stringify(value.subCategory))
      .set("tags", JSON.stringify(value.tags))
      .set("file", value.file);

    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/postMicrojob`, body, {
      headers: header,
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== post microjob====================*/
  updateMicrojob(value): Observable<any> {
    const body = new HttpParams()
      .set("id", value.id)
      .set("title", value.title)
      .set("description", value.description)
      .set("brDescription", value.brDescription)
      .set("price", value.price)
      .set("duration", value.duration)
      .set("category", JSON.stringify(value.category))
      .set("subCategory", JSON.stringify(value.subCategory))
      .set("tags", JSON.stringify(value.tags))
      .set("file", value.file);

    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/updateMicrojob`, body, {
      headers: header,
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== post hourly ====================*/
  postHourly(value): Observable<any> {
    // console.log("user ser");
    const body = new HttpParams()

      .set("title", value.title)
      .set("description", value.description)
      .set("brDescription", value.brDescription)
      .set("rate", value.rate)
      .set("duration", value.duration)
      .set("category", JSON.stringify(value.category))
      .set("subCategory", JSON.stringify(value.subCategory))
      .set("tags", JSON.stringify(value.tags))
      .set("file", value.file);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/postHourly`, body, {
      headers: header,
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== update hourly ====================*/

  updateHourly(value): Observable<any> {
    // console.log("user ser");
    const body = new HttpParams()
      .set("id", value.id)
      .set("title", value.title)
      .set("description", value.description)
      .set("brDescription", value.brDescription)
      .set("rate", value.rate)
      .set("duration", value.duration)
      .set("category", JSON.stringify(value.category))
      .set("subCategory", JSON.stringify(value.subCategory))
      .set("tags", JSON.stringify(value.tags))
      .set("file", value.file);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/updateHourly`, body, {
      headers: header,
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== post buyers request====================*/
  postBuyerRequest(value): Observable<any> {
    const body = new HttpParams()
      .set("title", value.title)
      .set("description", value.description)
      .set("brDescription", value.brDescription)
      .set("budget", value.budget)
      .set("duration", value.duration)
      .set("category", JSON.stringify(value.category))
      .set("subCategory", JSON.stringify(value.subCategory))
      .set("tags", JSON.stringify(value.tags));
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/postBuyerRequest`, body, {
      headers: header,
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== update hourly ====================*/

  updateBuyerRequest(value): Observable<any> {
    // console.log("user ser");
    const body = new HttpParams()
      .set("id", value.id)
      .set("title", value.title)
      .set("description", value.description)
      .set("brDescription", value.brDescription)
      .set("budget", value.budget)
      .set("duration", value.duration)
      .set("category", JSON.stringify(value.category))
      .set("subCategory", JSON.stringify(value.subCategory))
      .set("tags", JSON.stringify(value.tags));
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/updateBuyerRequest`, body, {
      headers: header,
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== post portfolio====================*/

  postPortfolio(value): Observable<any> {
    // console.log("user ser");

    const body = new HttpParams()
      .set("title", value.title)
      .set("description", value.description)
      .set("brDescription", value.brDescription)
      .set("links", value.links)
      .set("date", value.date)
      .set("category", JSON.stringify(value.category))
      .set("subCategory", JSON.stringify(value.subCategory))
      .set("tags", JSON.stringify(value.tags))
      .set("file", value.file);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/postPortfolio`, body, {
      headers: header,
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== update portfolio====================*/

  updatePortfolio(value): Observable<any> {
    // console.log("user ser");

    const body = new HttpParams()
      .set("id", value.id)
      .set("title", value.title)
      .set("description", value.description)
      .set("brDescription", value.brDescription)
      .set("links", value.links)
      .set("date", value.date)
      .set("brDescription", value.brDescription)
      .set("category", JSON.stringify(value.category))
      .set("subCategory", JSON.stringify(value.subCategory))
      .set("tags", JSON.stringify(value.tags))
      .set("file", value.file);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/updatePortfolio`, body, {
      headers: header,
      withCredentials: true
    });
  }

  postMicrojobOrder(value): Observable<any> {
    const body = new HttpParams()
      .set("title", value.title)
      .set("description", value.description)
      .set("duration", value.duration)
      .set("jobId", value.jobId)
      .set("microjobTitle", value.microjobTitle)
      .set("authorFname", value.authorFname)
      .set("authorUserName", value.authorUserName)
      .set("authorId", value.authorId);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/postMicrojobOrder`, body, {
      headers: header,
      withCredentials: true
    });
  }

  postRequestOrder(value): Observable<any> {
    const body = new HttpParams()
      .set("title", value.title)
      .set("description", value.description)
      .set("duration", value.duration)
      .set("jobId", value.jobId)
      .set("requestTitle", value.microjobTitle)
      .set("authorFname", value.authorFname)
      .set("authorUserName", value.authorUserName)
      .set("authorId", value.authorId);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/postRequestOrder`, body, {
      headers: header,
      withCredentials: true
    });
  }

  // postHourlyOrder
  /* ============================================================
   ==================== post hourly order ====================*/

  postHourlyOrder(value): Observable<any> {
    const body = new HttpParams()
      .set("title", value.title)
      .set("description", value.description)
      .set("duration", value.duration)
      .set("jobId", value.jobId)
      .set("hourlyTitle", value.hourlyTitle)
      .set("authorFname", value.authorFname)
      .set("authorUserName", value.authorUserName)
      .set("authorId", value.authorId);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/postHourlyOrder`, body, {
      headers: header,
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== accept order===================*/
  acceptOrder(type, id): Observable<any> {
    const body = new HttpParams().set("type", type).set("id", id);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/acceptOrder`, body, {
      headers: header,
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== decline order ====================*/
  declineOrder(type, id): Observable<any> {
    const body = new HttpParams().set("type", type).set("id", id);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/declineOrder`, body, {
      headers: header,
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== complete order ====================*/
  completeOrder(type, id, by): Observable<any> {
    const body = new HttpParams()
      .set("type", type)
      .set("id", id)
      .set("by", by);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/completeOrder`, body, {
      headers: header,
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== dispute order ====================*/
  disputeOrder(type, id, by): Observable<any> {
    const body = new HttpParams()
      .set("type", type)
      .set("id", id)
      .set("by", by);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/disputeOrder`, body, {
      headers: header,
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== delete posts===================*/
  deletePost(type, id): Observable<any> {
    const body = new HttpParams().set("type", type).set("id", id);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/deletePost`, body, {
      headers: header,
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== add rating====================*/
  addRating(value): Observable<any> {
    console.log(value);
    const body = new HttpParams()
      .set("receiverId", value.receiverId)
      .set("rating", value.rating)
      .set("receiverFname", value.receiverFname)
      .set("review", value.review)
      .set("jobId", value.jobId)
      .set("orderId", value.orderId)
      .set("jobAuthorId", value.jobAuthorId)
      .set("type", value.type);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/addRating`, body, {
      headers: header,
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== add message ====================*/
  addMessage(message, room, userData): Observable<any> {
    const body = new HttpParams()
      .set("receiverFname", userData.fname)
      .set("image", userData.profilePicture)
      .set("receiverId", userData._id)
      .set("room", room)
      .set("message", JSON.stringify(message));
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/addMessage`, body, {
      headers: header,
      withCredentials: true
    });
  }

  forgotPassword(email): Observable<any> {
    const body = new HttpParams().set("email", email);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/forgot`, body, {
      headers: header
    });
  }

  resetPassword(password, confirm, token): Observable<any> {
    const body = new HttpParams()
      .set("password", password)
      .set("confirm", confirm);
    let header: any = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(`${config.url}/reset/${token}`, body, {
      headers: header
    });
  }
  /**
   * GET Requests
   */

  /* ============================================================
     ==================== get hourlies ====================*/
  getHourlies(page, limit): Observable<any> {
    return this.http.get<any>(`${config.url}/getHourlies/${page}/${limit}`);
  }

  /* ============================================================
     ==================== get microjobs ====================*/
  getMicrojobs(page, limit): Observable<any> {
    return this.http.get<any>(`${config.url}/getMicrojobs/${page}/${limit}`);
  }

  /* ============================================================
     ==================== get buyerRequests====================*/
  getBuyerRequests(page, limit): Observable<any> {
    return this.http.get<any>(
      `${config.url}/getBuyerRequests/${page}/${limit}`
    );
  }

  /* ============================================================
     ==================== get userBox ====================*/
  getUserBox(id): Observable<any> {
    return this.http.get<any>(`${config.url}/getUserBox/${id}`);
  }

  /* ============================================================
     ==================== get signed url ====================*/
  getSignedUrl(filename): Observable<any> {
    let getheaders = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<any>(`${config.url}/getSignedUrl/${filename}`, {
      headers: getheaders
    });
  }

  uploadfileAWSS3(fileuploadurl, contenttype, file): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": contenttype,
      "Access-Control-Allow-Origin": "http://dev.digiwage.org"
    });
    const req = new HttpRequest("PUT", fileuploadurl, file, {
      headers: headers,
      reportProgress: true //This is required for track upload process
    });
    return this.http.request(req);
  }

  /* ============================================================
     ==================== getMyMicrojobs ====================*/
  getMyMicrojobs(): Observable<any> {
    return this.http.get<any>(`${config.url}/getMyMicrojobs`, {
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== getMyHourlies ====================*/
  getMyHourlies(): Observable<any> {
    return this.http.get<any>(`${config.url}/getMyHourlies`, {
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== getMyBuyerrequests====================*/
  getMyBuyerRequests(): Observable<any> {
    return this.http.get<any>(`${config.url}/getMyBuyerRequests`, {
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== get MyPortfolio====================*/
  getMyPortfolio(id): Observable<any> {
    return this.http.get<any>(`${config.url}/getMyPortfolio/${id}`, {
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== get MyHourlyOrders====================*/
  getMyHourlyOrders(): Observable<any> {
    return this.http.get<any>(`${config.url}/getMyHourlyOrder`, {
      withCredentials: true
    });
  }
  /* ============================================================
     ==================== get MyMicrojobOrders====================*/
  getMyMicrojobOrders(): Observable<any> {
    return this.http.get<any>(`${config.url}/getMyMicrojobOrder`, {
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== get MyRequestOrders====================*/
  getMyRequestOrders(): Observable<any> {
    return this.http.get<any>(`${config.url}/getMyRequestOrder`, {
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== get MySentRequestOrders====================*/
  getMySentOrders(type): Observable<any> {
    return this.http.get<any>(`${config.url}/getMySentOrders/${type}`, {
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== get singleOrder====================*/
  getMySingleOrder(type, id): Observable<any> {
    console.log(type, id);
    return this.http.get<any>(`${config.url}/singleOrder/${type}/${id}`, {
      withCredentials: true
    });
  }

  getReviews(type, id): Observable<any> {
    return this.http.get<any>(`${config.url}/getReviews/${type}/${id}`, {
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== get messageList ====================*/
  getMessageList(): Observable<any> {
    return this.http.get<any>(`${config.url}/getMessageList`, {
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== get messages ====================*/
  getMessages(room): Observable<any> {
    return this.http.get<any>(`${config.url}/getMessages/${room}`, {
      withCredentials: true
    });
  }

  /* ============================================================
     ==================== getSmallUserDetails ====================*/
  getSmallUserDetails(id): Observable<any> {
    return this.http.get<any>(`${config.url}/getSmallUserDetails/${id}`, {
      withCredentials: true
    });
  }
}

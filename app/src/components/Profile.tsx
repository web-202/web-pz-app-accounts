import React, { useState, useEffect } from "react";
import { Account } from "./Accounts";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import "../styles/Profile.css";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Account | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/accounts/${id}`)
      .then((response) => {
        setProfile(response.data as Account);
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
        console.log(error.response?.status);
      });
  }, [id]);

  return (
    <>
      <div className="head"></div>
      <div className="profile">
        {profile ? (
          <div>
            <h4>{profile.name}</h4>
            <p>
              <img
                className="imges"
                src="../../img/profile.png"
                alt="Profile"
              />
              <span className="text-color"> Name:</span> {profile.name}
            </p>
            <p>
              <img
                className="imges"
                src="../../img/profile_account.png"
                alt="Profile"
              />
              <span className="text-color"> Account name:</span>{" "}
              {profile.account_name}
            </p>
            <p>
              <img
                className="imges"
                src="../../img/email.png"
                alt="Profile"
              />
              <span className="text-color"> E-mail:</span> {profile.email}
            </p>
            <p>
              <img
                className="imges"
                src="../../img/star.png"
                alt="Profile"
              />
              <span className="text-color"> Status:</span> {profile.status}
            </p>
            <p>
              <img
                className="imges"
                src="../../img/alarmUp.png"
                alt="Profile"
              />
              <span className="text-color"> Start date:</span>{" "}
              {format(
                new Date((profile.start_date as number) * 1000),
                "dd MMM yyyy"
              )}
            </p>
            <p>
              <img
                className="imges"
                src="../../img/alarmDown.png"
                alt="Profile"
              />
              <span className="text-color"> Expiration date:</span>{" "}
              {format(
                new Date((profile.expiration_date as number) * 1000),
                "dd MMM yyyy"
              )}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

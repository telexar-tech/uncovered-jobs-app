export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  avatar: string;
  jobTitle: string;
  company: string;
  bio: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  social: {
    twitter: string;
    linkedin: string;
    github: string;
  };
}


// export const login = async (email: string, password: string): Promise<UserProfile> => {
//   const response = await fetch(`${BASE_URL}/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Login failed');
//   }

//   const userData: UserProfile = await response.json();
//   return userData;
// };

export const login = (email: string, password: string): Promise<UserProfile> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@test.com' && password === 'password') {
        resolve({
          id: '12345',
          email: 'test@test.com',
          firstName: 'John',
          lastName: 'Doe',
          phoneNumber: '+1234567890',
          address: '123 Main St, Anytown, USA',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          jobTitle: 'Software Engineer',
          company: 'Uncovered Jobs',
          bio: 'Passionate about building amazing products.',
          location: {
            city: 'San Francisco',
            state: 'CA',
            country: 'USA',
          },
          social: {
            twitter: 'https://twitter.com/johndoe',
            linkedin: 'https://linkedin.com/in/johndoe',
            github: 'https://github.com/johndoe',
          },
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

export const register = (userData: Omit<UserProfile, 'id' | 'avatar' | 'jobTitle' | 'company' | 'bio' | 'location' | 'social'>): Promise<UserProfile> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate error if email already exists
      if (userData.email === 'test@test.com') {
        reject(new Error('An account with this email already exists.'));
      } else {
        const newUser: UserProfile = {
          ...userData,
          id: Math.random().toString(36).substr(2, 9),
          avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
          jobTitle: '',
          company: '',
          bio: '',
          location: { city: '', state: '', country: '' },
          social: { twitter: '', linkedin: '', github: '' },
        };
        resolve(newUser);
      }
    }, 1000);
  });
};

// export const register = async (userData: Omit<UserProfile, 'id' | 'avatar' | 'jobTitle' | 'company' | 'bio' | 'location' | 'social'>): Promise<UserProfile> => {
//   const response = await fetch(`${BASE_URL}/register`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Registration failed');
//   }

//   const newUser: UserProfile = await response.json();
//   return newUser;
// };

export const sendOtp = (email: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate error for a specific email
      if (email === 'fail@test.com') {
        reject(new Error('Failed to send OTP. Please try again.'));
      } else {
        console.log(`OTP sent to ${email}`);
        resolve();
      }
    }, 1000);
  });
};

// export const sendOtp = async (email: string): Promise<void> => {
//   const response = await fetch(`${BASE_URL}/send-otp`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Failed to send OTP');
//   }
// };

export const verifyOtp = (email: string, otp: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate OTP verification. Correct OTP is '123456'
      if (otp === '123456') {
        console.log(`OTP verified for ${email}`);
        resolve();
      } else {
        reject(new Error('Invalid OTP.'));
      }
    }, 1000);
  });
};

// export const verifyOtp = async (email: string, otp: string): Promise<void> => {
//   const response = await fetch(`${BASE_URL}/verify-otp`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email, otp }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Invalid OTP');
//   }
// };

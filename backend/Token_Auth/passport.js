import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import passport from 'passport';
import userService from '../Business/Services/user.service.js';
import 'dotenv/config';

let options = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
            let token = null
            if (req && req.cookies) {
                token = req.cookies.token
            }
            return token
        }
    ]),
    secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    try {
        if (!jwt_payload.id)
            return done(null, false);
        const user = await userService.getUserById(jwt_payload.id);
        if (!user) {
            return done(null, false);
        }

        // Success, return user
        return done(null, user);

    } catch (error) {
        return done(error, false);
    }
}));

export default passport;
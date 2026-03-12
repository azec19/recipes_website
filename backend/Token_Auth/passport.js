import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import passport from 'passport';
import userService from '../Business/Services/user.service.js';
import 'dotenv/config';

let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    try {
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
import { OriginId } from 'maree-lettres-shared';

const RequestHelpers = {

    request_check_origin: function (req, res, next, origin_id = false) {
        if (!origin_id) {
            origin_id = req.params.origin_id;
        }
        // console.log(origin_id);

        if (!origin_id) {
            this.JsonRoutesError(res, 400, 'id-required');
        }

        // console.log(OriginId.verify(origin_id));

        if (!OriginId.verify(origin_id)) {
            this.JsonRoutesError(res, 401, 'id-invalid');
        }

        return origin_id;
    },

    JsonRoutesError: function (res, status_code, error_code) {
        const error_options = {
            code: status_code,
            data: {
                error: error_code,
            },
        };
        if (Meteor.settings.log_api_errors) {
            console.log("API_ERROR", error_options, res);
        }
        JsonRoutes.sendResult(res, error_options);
    },


    /**
     * Calculate a 32 bit FNV-1a hash
     * Found here: https://gist.github.com/vaiorabbit/5657561
     * Ref.: http://isthe.com/chongo/tech/comp/fnv/
     *
     * @param {string} str the input value
     * @param {boolean} [asString=true] set to true to return the hash value as 
     *     8-digit hex string instead of an integer
     * @param {integer} [seed] optionally pass the hash of the previous chunk
     * @returns {integer | string}
     */
    hashFnv32a: function (str, asString = true, seed) {
        /*jshint bitwise:false */
        var i, l,
            hval = (seed === undefined) ? 0x811c9dc5 : seed;

        for (i = 0, l = str.length; i < l; i++) {
            hval ^= str.charCodeAt(i);
            hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        }
        if (asString) {
            // Convert to 8 digit hex string
            return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
        }
        return hval >>> 0;
    },

    generateProposalId: function (seed1, seed2) {
        return this.hashFnv32a(seed1) + "_" + this.hashFnv32a(seed2);
    }
}

export default RequestHelpers